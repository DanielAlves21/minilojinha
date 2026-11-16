
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import "./ProductForm.css";

const categories = [
    { label: "Eletrônicos", value: "electronics" },
    { label: "Joias", value: "jewelery" },
    { label: "Roupas masculinas", value: "men's clothing" },
    { label: "Roupas femininas", value: "women's clothing" }
];

export default function ProductForm({ onAddProduct }) {
    const [product, setProduct] = useState({
        title: "",
        price: null,
        category: "",
        description: "",
        image: ""
    });

    function handleSubmit(e) {
        e.preventDefault();

        if (!product.title.trim() || !product.price || !product.category) {
            return;
        }

        onAddProduct({
            ...product,
            id: Date.now()
        });

        setProduct({
            title: "",
            price: null,
            category: "",
            description: "",
            image: ""
        });
    }

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Adicionar produto</h2>

            <div className="product-form-grid">
                <div className="product-form-field">
                    <label>Nome do produto *</label>
                    <InputText
                        value={product.title}
                        onChange={(e) =>
                            setProduct({ ...product, title: e.target.value })
                        }
                        placeholder="Ex: Smartphone"
                    />
                </div>

                <div className="product-form-field">
                    <label>Preço *</label>
                    <InputNumber
                        value={product.price}
                        onValueChange={(e) =>
                            setProduct({ ...product, price: e.value })
                        }
                        mode="currency"
                        currency="BRL"
                        locale="pt-BR"
                        min={0.01}
                        placeholder="R$ 0,00"
                    />
                </div>

                <div className="product-form-field">
                    <label>Categoria *</label>
                    <Dropdown
                        value={product.category}
                        options={categories}
                        onChange={(e) =>
                            setProduct({ ...product, category: e.value })
                        }
                        placeholder="Selecione uma categoria"
                    />
                </div>

                <div className="product-form-field">
                    <label>Imagem (URL)</label>
                    <InputText
                        value={product.image}
                        onChange={(e) =>
                            setProduct({ ...product, image: e.target.value })
                        }
                        placeholder="https://..."
                    />
                </div>

                <div className="product-form-field full-width">
                    <label>Descrição</label>
                    <InputText
                        value={product.description}
                        onChange={(e) =>
                            setProduct({ ...product, description: e.target.value })
                        }
                        placeholder="Descrição do produto"
                    />
                </div>
            </div>

            <Button
                type="submit"
                label="Adicionar produto"
                icon="pi pi-plus"
            />
        </form>
    );
}
