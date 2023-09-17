export const getSavedOrder = () => {
    const savedOrder = localStorage.getItem('saved_order')
      ? JSON.parse(localStorage.getItem('saved_order'))
      : [];
  
    return savedOrder;
  };
  
  export const saveCrepeIds = (crepeIdArr) => {
    if (crepeIdArr.length) {
      localStorage.setItem('saved_order', JSON.stringify(crepeIdArr));
    } else {
      localStorage.removeItem('saved_order');
    }
  };
  
  export const removeCrepeId = (crepeId) => {
    const savedOrder = localStorage.getItem('saved_order')
      ? JSON.parse(localStorage.getItem('saved_order'))
      : null;
  
    if (!savedOrder) {
      return false;
    }
  
    const updatedOrder = savedOrder?.filter((orderItem) => orderItem !== crepeId);
    localStorage.setItem('saved_books', JSON.stringify(updatedOrder));
  
    return true;
  };