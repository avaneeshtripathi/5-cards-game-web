export default class GameDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
    }

    startGame (gameName) {
        this.props.startGame(gameName);
    }

    render () {
        return (
            <ul className="gameListWrapper row">
                <li className="col-lg-3 col-md-4 col-sm-6">
                    <div className="gameListCard fiveCardsGameCard">
                        <span className="activeLabel">ACTIVE</span>
                        <h2 className="text-center">5 Cards Game</h2>
                        <div className="playNowOverlay text-center"><button onClick={this.startGame.bind(this, 'fiveCardsGame')}>Play Now</button></div>
                    </div>
                </li>
                <li className="col-lg-3 col-md-4 col-sm-6">
                    <div className="gameListCard">
                        <h2 className="text-center">NA</h2>
                    </div>
                </li>
                <li className="col-lg-3 col-md-4 col-sm-6">
                    <div className="gameListCard">
                        <h2 className="text-center">NA</h2>
                    </div>
                </li>
                <li className="col-lg-3 col-md-4 col-sm-6">
                    <div className="gameListCard">
                        <h2 className="text-center">NA</h2>
                    </div>
                </li>
            </ul>
        );
    }
};
