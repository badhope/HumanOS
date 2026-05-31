import Sample1 from './sample-1';
import Sample2 from './sample-2';

const Assessments = {
  list: [Sample1, Sample2],

  getAll() {
    return this.list;
  },

  getById(id) {
    return this.list.find(a => a.id === id) || null;
  },

  getByCategory(category) {
    return this.list.filter(a => a.category === category);
  },

  search(keyword) {
    const kw = keyword.toLowerCase();
    return this.list.filter(a =>
      a.name.toLowerCase().includes(kw) ||
      a.description.toLowerCase().includes(kw) ||
      a.tags.some(t => t.toLowerCase().includes(kw))
    );
  },

  getCategories() {
    const cats = new Set();
    this.list.forEach(a => cats.add(a.category));
    return ['全部', ...Array.from(cats)];
  }
};

export default Assessments;
