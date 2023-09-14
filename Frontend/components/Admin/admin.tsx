import { Select } from '@mui/material';
import React, { useState } from 'react'

const AdminPage() {

   
    }

    return (
        <div>
            <h2>Crear Producto</h2>

            <form onSubmit={handleSubmit}>
                <div className="text">
                    <div>Descripción</div>
                    <textarea
                        id="input"
                        placeholder="Escribir aquí..."
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>

                <div>
                    <div>Categoría</div>
                    <Select
                        options={options}
                        onChange={handleCategoryChange}
                        value={category}
                    />
                </div>

                <div>
                    <div>Imagen</div>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit">Publicar Producto</button>
            </form>
        </div>
    );
};


export default AdminPage;
