import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo, useEffect, useState } from 'react';
import { getTeams } from '../../API/loadData';
import React from 'react';
import { Pagination } from '../../components/Pagination/Pagination';
import './TeamsTable.css'
import { Loader } from '../../components/Loader/Loader';
import { Badge } from '../../components/Badge/Badge';
import { Team } from '../../types/Teams';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#EDE6FB',
    color: '#1D0053',
    fontSize: 16,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: '#14141E'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
}));


export const TeamsTable: React.FC = memo(() =>  {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);

  const perPage = 10;
  const currentPage = 1;

  const loadTeams = async (perPage: number, currentPage: number) => {
    setIsLoading(true);
    try {
      const teams = await getTeams(currentPage, perPage);

      setTeams(teams.data);
      setTotal(teams.meta.total_count);
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeams(perPage, currentPage);
  }, [currentPage, perPage]);

  const optionsPerPage = [10, 20, 30];

  return (
    <>
      {isLoading ? (
      <Loader />
      ) : (
        <>
          <div className="teamsTable-wrapper">
            <TableContainer>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell style={{ width: 110}}>Name</StyledTableCell>
                    <StyledTableCell style={{ width: 130}}>City</StyledTableCell>
                    <StyledTableCell style={{ width: 130}}>Abbreviation</StyledTableCell>
                    <StyledTableCell style={{ width: 120}}>Conference</StyledTableCell>
                    <StyledTableCell ></StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {teams.map((team) => (
                    <StyledTableRow key={team.id}>
                      <StyledTableCell component="th" scope="row">
                        {team.name}
                      </StyledTableCell>
                      <StyledTableCell>{team.city !== '' ? (<>{team.city}</>) : (<>{'-'}</>)}</StyledTableCell>
                      <StyledTableCell>{team.abbreviation}</StyledTableCell>
                      <StyledTableCell>
                        {team.conference !== '    ' ? (
                          <Badge text={team.conference}/>
                        ) : (<>{'-'}</>)}
                        </StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
      <div className="teamsTable-pg">
        <Pagination total={total} countPerPage={perPage} optionsPerPage={optionsPerPage} onLoad={loadTeams} />
      </div>
    </>
  );
});
