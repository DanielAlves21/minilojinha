
import { Card } from "primereact/card";

import "./ProductCard.css";

export default function ProductCard({ product, onViewDetails }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(price);
    };

    return (
        <Card
            className="product-card"
            header={
                <div className="product-card-header">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-card-image"
                        loading="lazy"
                    />
                </div>
            }
            footer={
                <button
                    className="product-card-button"
                    onClick={() => onViewDetails?.(product)}
                >
                    <i className="pi pi-shopping-cart"></i>
                    Ver produto
                </button>
            }
        >
            <div className="product-card-content">

                <span className="product-card-category">
                    {product.category}
                </span>

                <h2 className="product-card-title">
                    {product.title}
                </h2>

                <p className="product-card-description">
                    {product.description}
                </p>

                <div className="product-card-rating">
                    <i className="pi pi-star-fill"></i>

                    <strong>
                        {product.rating?.rate ?? "N/A"}
                    </strong>

                    <small>
                        ({product.rating?.count ?? 0} avaliações)
                    </small>
                </div>

                <div className="product-card-price">
                    {formatPrice(product.price)}
                </div>

            </div>
        </Card>
    );
}
