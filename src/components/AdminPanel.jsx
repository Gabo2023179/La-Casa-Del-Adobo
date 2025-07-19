import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div>
            <h2>Panel de Administración</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/addproduct">Agregar Producto</Link>
                    </li>
                    <li>
                        <Link to="/addpromociones">Agregar Promociones</Link>
                    </li>
                    <li>
                        <Link to="/addpromocionesPremium">Agregar Promociones Premium</Link>
                    </li>
                    <li>
                        <Link to="/addhome">Agregar a Inicio</Link>
                    </li>
                    <li>
                        <Link to="/addproductpremium">Agregar a Inicio</Link>
                    </li>
                    <li>
                        <Link to="/addbox">Agregar a Box</Link>
                    </li>
                    <li>
                        <Link to="/Message">Ver Mensajes</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminPanel;
