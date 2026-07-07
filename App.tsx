import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarDays, 
  Users, 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw 
} from 'lucide-react';

const initialRooms = [
  { id: '1', number: '101', type: 'DELUXE', price: 150, status: 'AVAILABLE' },
  { id: '2', number: '102', type: 'SUITE', price: 250, status: 'DIRTY' },
  { id: '3', number: '103', type: 'SINGLE', price: 80, status: 'AVAILABLE' },
  { id: '4', number: '201', type: 'DOUBLE', price: 120, status: 'MAINTENANCE' },
  { id: '5', number: '202', type: 'DELUXE', price: 150, status: 'AVAILABLE' },
];

export default function App() {
  const [rooms] = useState(initialRooms);

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'AVAILABLE').length;
  const occupancyRate = Math.round(((totalRooms - availableRooms) / totalRooms) * 100);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <BedDouble className="h-8 w-8 text-indigo-400" />
            <span className="text-xl font-bold tracking-wider">GrandPMS</span>
          </div>
          
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-600 rounded-lg text-sm font-medium transition-colors">
              <LayoutDashboard className="h-5 w-5" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium transition-colors">
              <CalendarDays className="h-5 w-5" /> Live Calendar
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium transition-colors">
              <BedDouble className="h-5 w-5" /> Room Inventory
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium transition-colors">
              <Users className="h-5 w-5" /> Guest Profiles
            </a>
          </nav>
        </div>
        
        <div className="p-6 border-t border-slate-800">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white text-sm font-medium">
            <Settings className="h-5 w-5" /> Settings
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">Property Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">Hurghada Resort</span>
            <div className="h-8 w-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm">AG</div>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Occupancy Rate</p>
                <h3 className="text-3xl font-bold mt-1">{occupancyRate}%</h3>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <LayoutDashboard className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Available Rooms</p>
                <h3 className="text-3xl font-bold mt-1">{availableRooms} / {totalRooms}</h3>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Housekeeping Alerts</p>
                <h3 className="text-3xl font-bold mt-1">{rooms.filter(r => r.status === 'DIRTY').length}</h3>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* ROOM GRID TABLE */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Live Room Status Grid</h2>
              <button className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-indigo-600 border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm transition-colors">
                <RefreshCw className="h-3.5 w-3.5" /> Refresh Status
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                    <th className="px-6 py-4">Room Number</th>
                    <th className="px-6 py-4">Room Type</th>
                    <th className="px-6 py-4">Base Price</th>
                    <th className="px-6 py-4">Housekeeping Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">Room {room.number}</td>
                      <td className="px-6 py-4 text-gray-600"><span className="bg-gray-100 px-2.5 py-1 rounded text-xs font-medium">{room.type}</span></td>
                      <td className="px-6 py-4 text-gray-700">${room.price} / night</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          room.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700' :
                          room.status === 'DIRTY' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            room.status === 'AVAILABLE' ? 'bg-emerald-500' :
                            room.status === 'DIRTY' ? 'bg-amber-500' : 'bg-rose-500'
                          }`} />
                          {room.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}