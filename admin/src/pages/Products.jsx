import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import ProductTable from '../components/ProductTable';

const EMPTY_FORM = {
  name: '', description: '', price: '', category: '', stock: '',
};

const PAGE_SIZE = 10;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [sortKey, setSortKey]   = useState('name');
  const [sortDir, setSortDir]   = useState('asc');
  const [page, setPage]         = useState(1);

  // Modal state
  const [modal, setModal]       = useState(null); // 'add' | 'edit' | 'delete'
  const [form, setForm]         = useState(EMPTY_FORM);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving]     = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/admin/products');
      setProducts(data);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── Filtered + sorted + paginated ────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const va = sortKey === 'price' ? a.price : a.name.toLowerCase();
        const vb = sortKey === 'price' ? b.price : b.name.toLowerCase();
        if (va < vb) return sortDir === 'asc' ? -1 : 1;
        if (va > vb) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
  }, [products, search, sortKey, sortDir]);

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort  = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  };

  // ── Modal helpers ─────────────────────────────────────────────────────────
  const openAdd = () => {
    setForm(EMPTY_FORM);
    setSelected(null);
    setModal('add');
  };

  const openEdit = (p) => {
    setForm({
      name: p.name,
      description: p.description || '',
      price: p.price,
      category: p.category,
      stock: p.stock,
    });
    setSelected(p);
    setModal('edit');
  };

  const openDelete = (p) => {
    setSelected(p);
    setModal('delete');
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
    setForm(EMPTY_FORM);
  };

  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ── CRUD handlers ─────────────────────────────────────────────────────────
  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/admin/products', form);
      toast.success('Product added!');
      closeModal();
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/admin/products/${selected._id}`, form);
      toast.success('Product updated!');
      closeModal();
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await api.delete(`/admin/products/${selected._id}`);
      toast.success('Product deleted');
      closeModal();
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setSaving(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Products</h2>
          <p className="page-subtitle">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button id="add-product-btn" className="btn-primary" onClick={openAdd}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Product
        </button>
      </div>

      {/* Controls */}
      <div className="products-controls">
        <div className="search-box">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            id="product-search"
            type="text"
            placeholder="Search by name or category…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="sort-buttons">
          <button
            id="sort-name-btn"
            className={`sort-btn ${sortKey === 'name' ? 'sort-btn--active' : ''}`}
            onClick={() => toggleSort('name')}
          >
            Name {sortKey === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>
          <button
            id="sort-price-btn"
            className={`sort-btn ${sortKey === 'price' ? 'sort-btn--active' : ''}`}
            onClick={() => toggleSort('price')}
          >
            Price {sortKey === 'price' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="table-skeleton">
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton-row" />)}
        </div>
      ) : (
        <ProductTable
          products={paginated}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            id="prev-page-btn"
            className="page-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              id={`page-btn-${i + 1}`}
              className={`page-btn ${page === i + 1 ? 'page-btn--active' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            id="next-page-btn"
            className="page-btn"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            {/* Add / Edit Form */}
            {(modal === 'add' || modal === 'edit') && (
              <>
                <div className="modal-header">
                  <h3>{modal === 'add' ? 'Add New Product' : 'Edit Product'}</h3>
                  <button className="modal-close" onClick={closeModal}>✕</button>
                </div>
                <form
                  id={modal === 'add' ? 'add-product-form' : 'edit-product-form'}
                  onSubmit={modal === 'add' ? handleAdd : handleEdit}
                  className="modal-form"
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label>Product Name *</label>
                      <input name="name" value={form.name} onChange={handleFormChange} placeholder="e.g. Running Shoes" required />
                    </div>
                    <div className="form-group">
                      <label>Category *</label>
                      <input name="category" value={form.category} onChange={handleFormChange} placeholder="e.g. Footwear" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Price (₹) *</label>
                      <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleFormChange} placeholder="0.00" required />
                    </div>
                    <div className="form-group">
                      <label>Stock *</label>
                      <input name="stock" type="number" min="0" value={form.stock} onChange={handleFormChange} placeholder="0" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Product description…" rows="3" />
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-ghost" onClick={closeModal}>Cancel</button>
                    <button
                      id={modal === 'add' ? 'confirm-add-btn' : 'confirm-edit-btn'}
                      type="submit"
                      className="btn-primary"
                      disabled={saving}
                    >
                      {saving ? <span className="spinner-sm" /> : modal === 'add' ? 'Add Product' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Delete Confirmation */}
            {modal === 'delete' && (
              <>
                <div className="modal-header">
                  <h3>Delete Product</h3>
                  <button className="modal-close" onClick={closeModal}>✕</button>
                </div>
                <div className="modal-body">
                  <div className="delete-icon">
                    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                  </div>
                  <p className="delete-msg">
                    Are you sure you want to delete <strong>"{selected?.name}"</strong>?
                    <br/>This action cannot be undone.
                  </p>
                  <div className="modal-actions">
                    <button type="button" className="btn-ghost" onClick={closeModal}>Cancel</button>
                    <button
                      id="confirm-delete-btn"
                      className="btn-danger"
                      onClick={handleDelete}
                      disabled={saving}
                    >
                      {saving ? <span className="spinner-sm" /> : 'Delete'}
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
