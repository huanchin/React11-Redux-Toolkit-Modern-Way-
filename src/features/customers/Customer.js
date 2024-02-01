import { useSelector } from "react-redux";

function Customer() {
  // 6) get the state from store by useSelector
  // useSelector creates a subscription to the store
  const customer = useSelector((state) => state.customer.fullName);
  // whenever the store changes, then this component that is subscribed to that store will re-render
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
