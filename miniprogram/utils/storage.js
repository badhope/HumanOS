const Storage = {
  KEYS: {
    ASSESSMENTS: 'mindmirror_assessments',
    RECORDS: 'mindmirror_records',
    SETTINGS: 'mindmirror_settings',
    CACHE: 'mindmirror_cache'
  },

  get(key) {
    try {
      const value = wx.getStorageSync(key);
      return value;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  set(key, data) {
    try {
      wx.setStorageSync(key, data);
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  remove(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  },

  clear() {
    try {
      wx.clearStorageSync();
      return true;
    } catch (e) {
      console.error('Storage clear error:', e);
      return false;
    }
  }
};

export default Storage;
