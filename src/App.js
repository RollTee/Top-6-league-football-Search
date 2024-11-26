import React, { useState, useEffect } from 'react';
import './App.css';
import logoFootball from './logo/logoFootball.png';
import football_team from './football_team.json';

function App() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  useEffect(() => {
    // Process and set data from the imported JSON file
    const formattedData = football_team.map((item) => ({
      club: item.Club_name,
      league: item.League || 'Not Provided', // Ensure fallback if 'League' is missing
      squad: parseInt(item.Squad, 10),
      foreigners: parseInt(item.Foreigners, 10),
      age: parseFloat(item.age),
      marketValue: item['market value'],
      totalMarketValue: item['Total market value'],
      description: item.Description,
      logo: item.logo,
      url: item.url,
    }));

    setTeams(formattedData);
  }, []);


  const filteredTeams = teams.filter((team) => {
    return team.club && team.club.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeams = filteredTeams.slice(startIndex, startIndex + itemsPerPage);

  const handleRowClick = (team) => {
    setSelectedTeam(team);
  };

  const handleClose = () => {
    setSelectedTeam(null);
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredTeams.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <img src={logoFootball} alt="Football Logo" height="150px" />
        <div className="heading-text">
          <h1>FOOTBALL TEAMS</h1>
          <h1 className="highlighted">in top 6 leagues of Europe</h1>
        </div>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="teams-table">
        <thead>
          <tr>
            <th> </th>
            <th>Club</th>
            <th>League</th>
            <th>Squad</th>
            <th>Foreigners</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTeams.map((team) => (
            <tr key={team.club} onClick={() => handleRowClick(team)}>
              <td>
                <img src={team.logo} alt={`${team.club} logo`} height="50px" />
              </td>
              <td>{team.club}</td>
              <td>{team.league}</td>
              <td>{team.squad}</td>
              <td>{team.foreigners}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Back
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredTeams.length}
        >
          Next
        </button>
      </div>

      {selectedTeam && (
        <div className="team-info-window">
          <div className="team-info-content">
            <button className="close-btn" onClick={handleClose}>X</button>
            <div className="team-info-columns">
              <div className="team-stats">
                <h2>{selectedTeam.club} Stats</h2>
                <img src={selectedTeam.logo} alt={selectedTeam.club} height="100px" />
                <p><strong>League:</strong> {selectedTeam.league}</p>
                <p><strong>Squad Size:</strong> {selectedTeam.squad}</p>
                <p><strong>Foreign Players:</strong> {selectedTeam.foreigners}</p>
                {selectedTeam.age && <p><strong>Average Age:</strong> {selectedTeam.age}</p>}
                {selectedTeam.marketValue && <p><strong>Market Value:</strong> {selectedTeam.marketValue}</p>}
                {selectedTeam.totalMarketValue && <p><strong>Total Market Value:</strong> {selectedTeam.totalMarketValue}</p>}
              </div>
              <div className="team-history">
                <h2>Club History</h2>
                <div className="team-description">
                  <p>{selectedTeam.description}</p>
                  <a href={selectedTeam.url} target="_blank" rel="noopener noreferrer">More details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
