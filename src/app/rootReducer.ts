import FootballSlice from 'features/book-football-pitch/FootballSlice';
import dialogSlice from 'features/dialog/dialogSlice';
import findAwayTeamSlice from 'features/find-away-team/findAwayTeamSlice';
import findPitchSlice from 'features/find-pitch/findPitchSlice';

import loginSlice from 'features/login/loginSlice';
import userSlice from 'features/user-Info/userSlice';

const rootreducer = {
  loginState: loginSlice,
  dialogState: dialogSlice,
  findPitchState: findPitchSlice,
  FootballState: FootballSlice,
  userState: userSlice,
  findAwayTeamState: findAwayTeamSlice,
};
export default rootreducer;
