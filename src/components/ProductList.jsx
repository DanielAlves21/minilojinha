
import { useEffect, useState } from "react";
import axios from "axios";

import { Card } from "primereact/card";

import "./ProductList.css";

const API_URL = "https://fakestoreapi.com/products";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProducts() {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(API_URL, {
                    signal: controller.signal
                });

                setProducts(response.data);
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error("Erro ao buscar produtos:", err);
                    setError("Não foi possível carregar os produtos.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchProducts();

        return () => {
            controller.abort();
        };
    }, [retry]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(price);
    };

    const handleRetry = () => {
        setRetry((previous) => previous + 1);
    };

    if (loading) {
        return (
            <div className="product-state">
                <div className="product-spinner"></div>
                <p>Carregando produtos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-state product-error">
                <i className="pi pi-exclamation-circle"></i>

                <p>{error}</p>

                <button
                    className="product-button"
                    onClick={handleRetry}
                >
                    <i className="pi pi-refresh"></i>
                    Tentar novamente
                </button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="product-state">
                <i className="pi pi-inbox"></i>
                <p>Nenhum produto encontrado.</p>
            </div>
        );
    }

    return (
        <section className="products-container">

            <header className="products-header">
                <div>
                    <h1>Nossos produtos</h1>
                    <p>
                        Confira nossa seleção de produtos.
                    </p>
                </div>

                <span className="products-count">
                    {products.length} produtos
                </span>
            </header>

            <div className="products-grid">

                {products.map((product) => {

                    const cardHeader = (
                        <div className="product-card-header">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="product-image"
                                loading="lazy"
                            />
                        </div>
                    );

                    const cardFooter = (
                        <button
                            className="product-button"
                            onClick={() => {
                                console.log(
                                    "Produto selecionado:",
                                    product
                                );
                            }}
                        >
                            <i className="pi pi-shopping-cart"></i>
                            Ver produto
                        </button>
                    );

                    return (
                        <Card
                            key={product.id}
                            className="product-card"
                            header={cardHeader}
                            footer={cardFooter}
                        >
                            <span className="product-category">
                                {product.category}
                            </span>

                            <h2 className="product-title">
                                {product.title}
                            </h2>

                            <p className="product-description">
                                {product.description}
                            </p>

                            <div className="product-rating">
                                <i className="pi pi-star-fill"></i>

                                <strong>
                                    {product.rating?.rate ?? "N/A"}
                                </strong>

                                <small>
                                    ({product.rating?.count ?? 0} avaliações)
                                </small>
                            </div>

                            <div className="product-price">
                                {formatPrice(product.price)}
                            </div>
                        </Card>
                    );
                })}

            </div>
        </section>
    );
}
