import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { memo, useEffect, useState } from 'react';
import { Team } from '../types/Team';
import { getTeams } from '../API/loadData';
import React from 'react';
import { Pagination } from './Pagination';
import './TeamsTable.css'
import { Loader } from './Loader';
import { Badge } from './Badge';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#EDE6FB',
    color: '#1D0053',
    fontSize: 16,
    fontWeight: 700
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export const TeamsTable: React.FC = memo(() =>  {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const perPage = 10;
  const currentPage = 1;

  const loadPlayers = async () => {
    setIsLoading(true);
    try {
      const teams = await getTeams(currentPage, perPage);
      console.log(teams);

      setTeams(teams.data);
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, [currentPage, perPage]);

  const optionsPerPage = [10, 20, 30];

  return (
    <>
      {isLoading ? (
      <Loader />
      ) : (
        <>
          <div className="teamsTable-wrapper">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">City</StyledTableCell>
                    <StyledTableCell align="left">Abbreviation</StyledTableCell>
                    <StyledTableCell align="left">Conference</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams.map((team) => (
                    <StyledTableRow key={team.id}>
                      <StyledTableCell align="left">
                        {team.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">{team.city}</StyledTableCell>
                      <StyledTableCell align="left">{team.abbreviation}</StyledTableCell>
                      <StyledTableCell align="left">
                        <Badge text={team.conference}/>
                        </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="teamsTable-pg">
            <Pagination setData={setTeams} path="teams" countPerPage={perPage} optionsPerPage={optionsPerPage} />
          </div>
        </>
      )}
    </>
  );
});
