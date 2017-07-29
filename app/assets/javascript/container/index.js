import {getSession, setSession, clearSession} from '../utils/sessionUtils';
import GameDashboard from '../gameContainer/gameDashboard';
import FiveCardsGame from '../gameContainer/fiveCardsGame';

export default class Container extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedGame: getSession('selectedGame')
        };
        this.startGame = this.startGame.bind(this);
        this.getGameView = this.getGameView.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    startGame (gameName) {
        setSession('selectedGame', gameName);
        this.setState({
            selectedGame: 'fiveCardsGame'
        });
    }

    getGameView () {
        switch(this.state.selectedGame) {
            case 'fiveCardsGame': return <FiveCardsGame resetGame={this.resetGame} />;
            default: return <GameDashboard startGame={this.startGame} />
        }
    }

    resetGame () {
        clearSession();
        this.setState({
            selectedGame: ''
        });
    }

    render () {
        return (
            <section className="templateWrapper">
                <header><h1>Flat 204 Gaming Arena</h1></header>
                <main className="container">
                    {this.getGameView()}
                </main>
            </section>
        );
    }
};
