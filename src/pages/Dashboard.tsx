import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Laboratory } from '../types';
import { Building2, Server, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        const labsCollection = collection(db, 'laboratories');
        const labSnapshot = await getDocs(labsCollection);
        const labList = labSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Laboratory[];
        setLaboratories(labList);
      } catch (error) {
        console.error('Error fetching laboratories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaboratories();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-use':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'maintenance':
        return <Server className="w-5 h-5 text-yellow-500" />;
      case 'damaged':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Panel de Control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {laboratories.map((lab) => (
          <div key={lab.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Building2 className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">{lab.name}</h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              Encargado: {lab.manager}
            </p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Equipos:</h3>
              {lab.equipment.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.assignedTo && (
                      <p className="text-sm text-gray-500">
                        Asignado a: {item.assignedTo}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(item.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;