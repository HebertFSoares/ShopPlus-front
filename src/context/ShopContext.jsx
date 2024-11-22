import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "R$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]); // Novo estado para os produtos do backend

  // Carregar os produtos do backend
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:8080/api/produtos");
    const data = await response.json();
    setProducts(data); // Atualiza a lista de produtos com dados do backend
  };

  useEffect(() => {
    fetchProducts(); // Chama o fetch ao carregar o contexto
  }, []);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
  
    // Clonando o estado atual do carrinho
    let cartData = structuredClone(cartItems);
  
    // Encontrar o produto pelo ID
    const product = products.find((item) => item._id === itemId);
  
    // Verificar se o produto foi encontrado
    if (!product) {
      console.log("Produto não encontrado", itemId);
      return;
    }
  
    // Log dos dados do produto
    console.log("Produto encontrado:", product);
  
    // Se o item já existe no carrinho
    if (cartData[itemId]) {
      // Se o tamanho já existe, incrementa a quantidade
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
        console.log(`Quantidade do produto ${product.nome} (${size}) aumentada para ${cartData[itemId][size]}`);
      } else {
        // Caso contrário, adiciona o tamanho com quantidade 1
        cartData[itemId][size] = 1;
        console.log(`Novo tamanho (${size}) adicionado ao carrinho para o produto ${product.nome}`);
      }
    } else {
      // Se o item não está no carrinho, adiciona com o tamanho e quantidade 1
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
      console.log(`Produto ${product.nome} adicionado ao carrinho com tamanho ${size}`);
    }
  
    // Atualiza o estado do carrinho
    setCartItems(cartData);
  
    // Log do carrinho atualizado
    console.log("Carrinho atualizado:", cartData);
  };
  

  const getCartCount = () => {
    let totalCount = 0;
    for (const i in cartItems) {
      for (const j in cartItems[i]) {
        totalCount += cartItems[i][j];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((i) => i._id === item); // Usar o produto do backend
      for (const j in cartItems[item]) {
        try {
          if (cartItems[item][j] > 0) {
            totalAmount += itemInfo.preco * cartItems[item][j]; // Calcular o preço total
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
