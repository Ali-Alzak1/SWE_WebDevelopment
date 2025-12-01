import React from 'react';
import ProgramCard from '../GuestHome/ProgramCard';
import './Vault.css';

const Vault = ({ vaultItems = [], onOpenProgram }) => {
  return (
    <div className="vault">
      <div className="container">
        <div className="vault__header">
          <h1 className="vault__title">Jadwals Vault</h1>
          <p className="vault__subtitle">Your saved workout programs</p>
        </div>

        {vaultItems.length === 0 ? (
          <div className="vault__empty">
            <p>No saved programs yet. Create your first Jadwal to get started!</p>
          </div>
        ) : (
          <div className="vault__programs">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
              {vaultItems.map((program) => (
                <div key={program.id} className="col">
                  <ProgramCard
                    program={program}
                    onClick={onOpenProgram}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vault;

