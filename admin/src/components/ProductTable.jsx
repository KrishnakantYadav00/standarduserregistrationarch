export default function ProductTable({ products, onEdit, onDelete }) {
  if (!products.length) {
    return (
      <div className="table-empty">
        <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={p._id} className="table-row">
              <td className="table-idx">{idx + 1}</td>
              <td className="table-name">
                <div className="product-name-cell">
                  <div className="product-avatar">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="product-name-text">{p.name}</p>
                    <p className="product-desc-text">
                      {p.description
                        ? p.description.slice(0, 40) + (p.description.length > 40 ? '…' : '')
                        : '—'}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <span className="category-badge">{p.category}</span>
              </td>
              <td className="table-price">₹{Number(p.price).toLocaleString()}</td>
              <td>
                <span className={`stock-badge ${p.stock > 10 ? 'stock-ok' : p.stock > 0 ? 'stock-low' : 'stock-out'}`}>
                  {p.stock}
                </span>
              </td>
              <td>
                <div className="rating-cell">
                  <svg width="14" height="14" fill="#f59e0b" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span>{Number(p.averageRating || 0).toFixed(1)}</span>
                </div>
              </td>
              <td>
                <div className="action-btns">
                  <button
                    id={`edit-btn-${p._id}`}
                    className="btn-edit"
                    onClick={() => onEdit(p)}
                    title="Edit product"
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    id={`delete-btn-${p._id}`}
                    className="btn-delete"
                    onClick={() => onDelete(p)}
                    title="Delete product"
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
