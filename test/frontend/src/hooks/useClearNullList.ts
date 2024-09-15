import { useEffect } from 'react';

const useClearNullList = () => {
  useEffect(() => {
    const removeEmptyListItems = () => {
      const listItems = document.querySelectorAll("li");
      listItems.forEach(item => {
        if (!item.textContent?.trim()) {
          item.remove();
        }
      });
    };

    // Panggil fungsi setelah konten DOM terbentuk
    removeEmptyListItems();
  }, []); // Dependency array kosong berarti hook ini hanya dipanggil sekali setelah render pertama
};

export default useClearNullList;
