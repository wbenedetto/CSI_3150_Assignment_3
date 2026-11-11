import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumDetailPage = ({ albums, onAddToCart }) => {
  const { albumId } = useParams();
  const [qty, setQty] = useState(1);

  const album = albums.find((a) => a.id === albumId);

  if (!album) {
    return (
      <div className="detail-error">
        <h2>Album Not Found</h2>
        <Link className="btn btn-secondary" to="/">
          Return To Main Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <nav className="breadcrumb">
        <Link to="/">Catalog</Link> &gt; <span>{album.title}</span>
      </nav>

      <div className="detail-grid">
        <img src={album.image} alt={album.title} className="detail-img" />

        <div className="detail-info">
          <span className="album-genre">{album.genre}</span>
          <h1 className="detail-title">{album.title}</h1>
          <p className="detail-artist">{album.artist}</p>
          <p className="detail-price">${album.price.toFixed(2)}</p>
          <p className="detail-desc">{album.description}</p>
          <div className="album-specs">
            <h3>Specifications</h3>
            <p className="album-specs-meta">
              Catalog Number: {album.specs.catalogNumber}
            </p>
            <p className="album-specs-meta">Weight: {album.specs.weight}</p>
            <p className="album-specs-meta">Speed: {album.specs.speed}</p>
            <p className="album-specs-meta">Label: {album.specs.label}</p>
          </div>

          <div className="album-tracklist">
            <h3>Tracklist</h3>
            <ol>
              {album.tracklist.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
            </ol>
          </div>
          <div className="stock-tag">
            {album.stock > 0
              ? `✓ In Stock (${album.stock} units available)`
              : "Item out of stock"}
          </div>

          <div className="detail-action">
            <div className="qty-input-group">
              <label htmlFor="detail-qty">Quantity: </label>
              <input
                type="number"
                id="detail-qty"
                min="1"
                max={album.stock}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onAddToCart(album, qty)}
              disabled={album.stock === 0}
            >
              Add {qty} to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailPage;
