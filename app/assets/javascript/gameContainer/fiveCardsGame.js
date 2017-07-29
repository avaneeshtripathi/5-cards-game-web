import {getSession, setSession, clearSession} from '../utils/sessionUtils';
import PlayerDetails from '../component/fiveCardsGame/playerDetails';
import GameStats from '../component/fiveCardsGame/gameStats';
import AdditionalStats from '../component/fiveCardsGame/additionalStats';
import GamePlay from '../component/fiveCardsGame/gamePlay';
import GameResults from '../component/fiveCardsGame/gameResults';

export default class fiveCardsGame extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            requestErrMsg: ''
        };
        this.navigationIndex = sessionStorage.navigationIndex ? getSession('navigationIndex') : 1;
        this.getCurrentView = this.getCurrentView.bind(this);
        this.updatePlayerList = this.updatePlayerList.bind(this);
        this.setGameLimit = this.setGameLimit.bind(this);
        this.setAviOneup = this.setAviOneup.bind(this);
        this.showGameResults = this.showGameResults.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    getCurrentView () {
        switch(this.navigationIndex) {
            case 1: return (<PlayerDetails updatePlayerList={this.updatePlayerList} resetGame={this.resetGame} />);
            case 2: return (<GameStats goBack={this.goBack} resetGame={this.resetGame} setGameLimit={this.setGameLimit} />);
            case 3: return (<AdditionalStats goBack={this.goBack} resetGame={this.resetGame} setAviOneup={this.setAviOneup} />);
            case 4: return (<GamePlay goBack={this.goBack} resetGame={this.resetGame} showGameResults={this.showGameResults}  />);
            case 5: return (<GameResults resetGame={this.resetGame} />);
            default: return 'Something went wrong. Please Refresh the page';
        }
    }

    updatePlayerList (playerList) {
        this.navigationIndex = 2;
        setSession('playerList', playerList);
        setSession('playerRank', playerList.length);
        setSession('navigationIndex', this.navigationIndex);
        this.setState(this.state);
    }

    setGameLimit (gameLimit) {
        this.navigationIndex = 3;
        setSession('gameLimit', {value: gameLimit, isEditable: true});
        setSession('navigationIndex', this.navigationIndex);
        this.setState(this.state);
    }

    setAviOneup (oneupStatus) {
        this.navigationIndex = 4;
        setSession('aviOneup', oneupStatus);
        setSession('navigationIndex', this.navigationIndex);
        this.setState(this.state);
    }

    showGameResults () {
        this.navigationIndex = 5;
        setSession('navigationIndex', this.navigationIndex);
        this.setState(this.state);
    }

    resetGame (event = {preventDefault(){}}) {
        event.preventDefault();
        this.props.resetGame();
    }

    goBack (navIndex) {
      this.navigationIndex = navIndex;
      setSession('navigationIndex', this.navigationIndex);
      this.setState(this.state);
    }

    render () {
        return (
            <section className="specificGameContainer">
                <h2 className="specificGameHead text-center">5 Cards Game</h2>
                {this.getCurrentView()}
            </section>
        );
    }
};
