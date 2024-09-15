import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostulacionModal from './PostulacionModal';

export const EmpleoList = () => {
    const [empleos, setEmpleos] = useState([]);
    const [selectedEmpleo, setSelectedEmpleo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Obtener la lista de empleos
        const fetchEmpleos = async () => {
            try {
                const response = await axios.get('http://vps-4291415-x.dattaweb.com:8080/api/empleo/listar');

                setEmpleos(response.data.data);
            } catch (error) {
                console.error('Error al obtener los empleos', error);
            }
        };

        fetchEmpleos();
    }, []);

    const openModal = (empleo) => {
        setSelectedEmpleo(empleo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmpleo(null);
    };

    return (
        <div>
            <h2>Lista de Empleos</h2>
            <ul>
                {empleos.map((empleo) => (
                    <li key={empleo.idEmpleo}>
                        <h3>{empleo.titulo}</h3>
                        <p>{empleo.descripcion}</p>
                        <button onClick={() => openModal(empleo)}>Postularse</button>
                    </li>
                ))}
            </ul>

            {/* Modal de Postulación */}
            {isModalOpen && selectedEmpleo && (
                <PostulacionModal empleo={selectedEmpleo} onClose={closeModal} />
            )}
        </div>
    );
};

export default EmpleoList;
