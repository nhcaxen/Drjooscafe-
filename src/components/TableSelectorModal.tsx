import React, { useState, useEffect, useMemo } from 'react';
import { X, Check, ShoppingBag, AlertCircle } from 'lucide-react';

interface TableSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTable: string;
  onSelectTable: (table: string) => void;
}

const TABLES = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

// 5-minute cycle duration in milliseconds
const FIVE_MINUTES_MS = 5 * 60 * 1000;

// Deterministic helper that selects exactly 3 reserved tables for any 5-minute block.
// This is completely independent of user selection, so tapping "Parcel" never shifts or alters the count.
export const getReservedTables = (timestamp: number): string[] => {
  const block = Math.floor(timestamp / FIVE_MINUTES_MS);

  const i1 = (block * 3 + 2) % TABLES.length;
  const i2 = (block * 7 + 5) % TABLES.length;
  const i3 = (block * 11 + 8) % TABLES.length;

  const reservedSet = new Set<string>();
  reservedSet.add(TABLES[i1]);

  for (let offset = 0; offset < TABLES.length; offset++) {
    const candidate = TABLES[(i2 + offset) % TABLES.length];
    if (!reservedSet.has(candidate)) {
      reservedSet.add(candidate);
      break;
    }
  }

  for (let offset = 0; offset < TABLES.length; offset++) {
    const candidate = TABLES[(i3 + offset) % TABLES.length];
    if (!reservedSet.has(candidate)) {
      reservedSet.add(candidate);
      break;
    }
  }

  return Array.from(reservedSet);
};

export const TableSelectorModal: React.FC<TableSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTable,
  onSelectTable,
}) => {
  const [selected, setSelected] = useState(currentTable);
  const [occupiedNotice, setOccupiedNotice] = useState<string | null>(null);
  const [timeTick, setTimeTick] = useState<number>(Date.now());

  // Keep selected in sync with currentTable when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelected(currentTable);
      setOccupiedNotice(null);
    }
  }, [isOpen, currentTable]);

  // Periodic timer checking every 5 seconds so 5-minute rotation triggers automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTick(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Compute 5-minute block number
  const currentBlock = Math.floor(timeTick / FIVE_MINUTES_MS);

  // Exactly 3 reserved tables, rotating every 5 minutes automatically.
  // Independent of `currentTable` or 'Parcel' selection!
  const occupiedTables = useMemo(() => {
    return getReservedTables(timeTick);
  }, [currentBlock]);

  if (!isOpen) return null;

  const handleTableClick = (tableId: string) => {
    if (occupiedTables.includes(tableId)) {
      setOccupiedNotice(`Table ${tableId} is reserved. Please pick any free table.`);
      return;
    }
    setOccupiedNotice(null);
    setSelected(tableId);
    onSelectTable(tableId);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const handleTakeawayClick = () => {
    setOccupiedNotice(null);
    setSelected('Takeaway');
    onSelectTable('Takeaway');
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const freeCount = TABLES.length - occupiedTables.length; // Always 10 - 3 = 7

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Clean Bottom Sheet Dialog */}
      <div className="relative w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-xl z-10 overflow-hidden border-t sm:border border-zinc-200/80 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-5 duration-200">
        
        {/* Mobile Pull Handle Indicator */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden">
          <div className="w-10 h-1 rounded-full bg-zinc-200" />
        </div>

        {/* Modal Header: "Choose Table" */}
        <div className="px-5 pt-3 pb-3 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-zinc-900 tracking-tight">Choose Table</h3>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-500 font-normal">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {freeCount} Free
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-rose-500">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                {occupiedTables.length} Reserved
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200/80 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors active-press cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Occupied Alert Notice */}
        {occupiedNotice && (
          <div className="mx-5 mt-3 p-2.5 rounded-xl bg-rose-50/80 border border-rose-200/80 flex items-center gap-2 text-rose-700 text-xs font-normal animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="leading-snug">{occupiedNotice}</span>
          </div>
        )}

        {/* Tables Grid (Clean 2-Columns, Non-Bold, Green Dot for Free, 'Reserved' for Busy) */}
        <div className="p-5 overflow-y-auto space-y-3.5">
          <div className="grid grid-cols-2 gap-2.5">
            {TABLES.map((t) => {
              const isOccupied = occupiedTables.includes(t);
              const isSelected = selected === t;

              return (
                <button
                  key={t}
                  onClick={() => handleTableClick(t)}
                  className={`p-3 rounded-2xl border text-left transition-all active-press relative ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm cursor-pointer'
                      : isOccupied
                      ? 'bg-rose-50/40 border-rose-100 cursor-not-allowed opacity-80'
                      : 'bg-white hover:bg-zinc-50 border-zinc-200/80 hover:border-zinc-300 shadow-2xs cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        isSelected
                          ? 'text-white'
                          : isOccupied
                          ? 'text-zinc-400'
                          : 'text-zinc-800'
                      }`}
                    >
                      Table {t}
                    </span>

                    {/* Status Indicator */}
                    {isSelected ? (
                      <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[2.2]" />
                      </span>
                    ) : isOccupied ? (
                      <span className="text-[11px] font-normal text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100/80">
                        Reserved
                      </span>
                    ) : (
                      /* Free table: clean green dot */
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="relative flex py-0.5 items-center">
            <div className="flex-grow border-t border-zinc-100" />
            <span className="flex-shrink mx-2 text-[10px] uppercase font-normal text-zinc-300 tracking-wider">
              or
            </span>
            <div className="flex-grow border-t border-zinc-100" />
          </div>

          {/* Takeaway / Parcel Option */}
          <button
            onClick={handleTakeawayClick}
            className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all active-press cursor-pointer ${
              selected === 'Takeaway'
                ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                : 'bg-zinc-50/70 hover:bg-zinc-100 border-zinc-200/70 text-zinc-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  selected === 'Takeaway'
                    ? 'bg-zinc-800 text-white'
                    : 'bg-white text-zinc-600 border border-zinc-200/80 shadow-2xs'
                }`}
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div className="text-left">
                <span
                  className={`text-xs font-medium block ${
                    selected === 'Takeaway' ? 'text-white' : 'text-zinc-800'
                  }`}
                >
                  Takeaway / Parcel
                </span>
                <span
                  className={`text-[10px] font-normal block ${
                    selected === 'Takeaway' ? 'text-zinc-300' : 'text-zinc-400'
                  }`}
                >
                  Collect from counter
                </span>
              </div>
            </div>

            {selected === 'Takeaway' ? (
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.2]" />
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs mr-1" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
