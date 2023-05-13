import React, { useState, useEffect } from "react";
import "./BarrelType.css"
import {
    createBarrelType,
    deleteBarrelType,
    getAllBarrelTypes,
    updateBarrelType
} from "../../services/barrelTypeService";

const BarrelType = () => {
    const [barrelTypes, setBarrelTypes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newBarrelType, setNewBarrelType] = useState("");

    useEffect(() => {
        const fetchBarrelTypes = async () => {
            const { data } = await getAllBarrelTypes();
            setBarrelTypes(data);
        };
        fetchBarrelTypes();
    }, []);

    const handleAddBarrelType = async () => {
        await createBarrelType({ name: newBarrelType });
        setNewBarrelType("");
        const { data } = await getAllBarrelTypes();
        setBarrelTypes(data);
    };

    const handleEditBarrelType = async (id, name) => {
        await updateBarrelType(id, { name });
        setEditingId(null);
        const { data } = await getAllBarrelTypes();
        setBarrelTypes(data);
    };

    const handleDeleteBarrelType = async (id) => {
        await deleteBarrelType(id);
        const { data } = await getAllBarrelTypes();
        setBarrelTypes(data);
    };

    return (
        <div className="barrel-type">
            <h2>Barrel Types</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {barrelTypes.map((barrelType) => (
                    <tr key={barrelType.id}>
                        <td>
                            {barrelType.id === editingId ? (
                                <input
                                    type="text"
                                    value={newBarrelType}
                                    onChange={(e) => setNewBarrelType(e.target.value)}
                                />
                            ) : (
                                barrelType.name
                            )}
                        </td>
                        <td>
                            {barrelType.id === editingId ? (
                                <>
                                    <button onClick={() => handleEditBarrelType(barrelType.id, newBarrelType)}>Save</button>
                                    <button onClick={() => setEditingId(null)}>Cancel</button>
                                </>
                            ) : (
                                <button onClick={() => setEditingId(barrelType.id)}>Edit</button>
                            )}
                        </td>
                        <td>
                            <button onClick={() => handleDeleteBarrelType(barrelType.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <input
                    type="text"
                    value={newBarrelType}
                    onChange={(e) => setNewBarrelType(e.target.value)}
                />
                <button onClick={handleAddBarrelType}>Add Barrel Type</button>
            </div>
        </div>
    );
};

export default BarrelType;
