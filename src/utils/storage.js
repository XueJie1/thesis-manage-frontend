// utils/storage.js
// 从localStorage中读取数据
export default {
    get(key) {
      const value = localStorage.getItem(key);
      try {
        return value ? JSON.parse(value) : null;
      } catch {
        return value;
      }
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }