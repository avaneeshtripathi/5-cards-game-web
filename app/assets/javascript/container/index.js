import {getSession, setSession, clearSession} from '../utils/sessionUtils';
import PlayerDetails from '../component/playerDetails';
import GameStats from '../component/gameStats';
import AdditionalStats from '../component/additionalStats';
import GamePlay from '../component/gamePlay';
import GameResults from '../component/gameResults';

export default class Container extends React.Component{
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
    }

    getCurrentView () {
        switch(this.navigationIndex) {
            case 1: return (<PlayerDetails updatePlayerList={this.updatePlayerList} />);
            case 2: return (<GameStats setGameLimit={this.setGameLimit} />);
            case 3: return (<AdditionalStats setAviOneup={this.setAviOneup} />);
            case 4: return (<GamePlay showGameResults={this.showGameResults} />);
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
        this.navigationIndex = 4;
        setSession('gameLimit', gameLimit);
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

    resetGame () {
        this.navigationIndex = 1;
        clearSession();
        this.setState(this.state);
    }

    render () {
        return (
            <section className="templateWrapper">
                <header>
                    <h1>Flat 204 Gaming Arena</h1>
                    <h2>5 Cards Game</h2>
                </header>
                <div className="container">
                    {this.getCurrentView()}
                </div>
            </section>
        );
    }
};
