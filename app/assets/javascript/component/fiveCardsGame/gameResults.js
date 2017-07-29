import ReactHighcharts from 'react-highcharts';
import { getLineChartConfig } from '../../utils/lineChartConfig';
import { getSession, setSession } from '../../utils/sessionUtils';
const tortoiseImage  = require('../../../images/tortoise.png');
const rabbitImage  = require('../../../images/rabbit.png');
const cockImage  = require('../../../images/cock.png');
const loserImage  = require('../../../images/loser.png');
const winnerImage  = require('../../../images/winner.png');

class GameResults extends React.Component{
    constructor (props) {
        super(props);
        this.playerData = getSession('playerData');
        this.playerList = getSession('playerList');
        this.lineChartSeries = [];
        this.resetGame = this.resetGame.bind(this);
        this.getMaxArrayLength = this.getMaxArrayLength.bind(this);
        this.getChartConfig = this.getChartConfig.bind(this);
        this.getAvatarImage = this.getAvatarImage.bind(this);
    }

    componentWillMount () {
        this.getChartConfig();
    }

    getChartConfig () {
        this.playerStrengthMultiplier = 100 / this.getMaxArrayLength();
        underscore.times(this.playerData.length, (key) => {
            let tempArray = [],
                tempVar = 0;
            underscore.times(this.playerData[key].points.length, (childKey) => {
                tempVar += this.playerData[key].points[childKey];
                tempArray.push(tempVar);
            })
            if ((!this.playerData[key].rank || this.playerData[key].rank < 2) && this.playerData[key].points.length < this.getMaxArrayLength()) {
                tempArray.push(tempVar);
            }
            this.lineChartSeries.push(
                {
                    name: this.playerData[key].name,
                    data: [0, ...tempArray],
                    type: 'spline'
                }
            );
        });
    }

    getMaxArrayLength () {
        let arrayLengths = [];
        underscore.times(this.playerList.length, (key) => {
            arrayLengths.push(this.playerData[key].points.length);
        });
        return Math.max(...arrayLengths);
    }

    resetGame (event = {preventDefault(){}}) {
        event.preventDefault();
        this.refs.notificationOverlay.setAttribute('style', 'display: block');
        this.refs.notificationMessage.setAttribute('style', 'display: block');
        setTimeout(() => {
            this.props.resetGame();
        }, 1000);
    }

    getAvatarImage (playerRank) {
        let primaryImageUrl, secondaryImageUrl;
        if (playerRank && playerRank === this.playerData.length) {
            primaryImageUrl = rabbitImage;
        } else if (playerRank && playerRank > 1) {
            primaryImageUrl = cockImage;
        } else {
            primaryImageUrl = tortoiseImage;
            secondaryImageUrl = winnerImage;
        }
        return (
            <div className="resultImageSection">
                {secondaryImageUrl
                    ? <div className="winnerImage">
                          <img src={secondaryImageUrl} />
                      </div>
                    : null
                }
                <div className={!playerRank || playerRank === this.playerData.length ? 'imageWrapper imageLarge' : 'imageWrapper imageSmall'}>
                    <img src={primaryImageUrl} />
                </div>
            </div>
        );
    }

    render () {
        return (
            <div className="gameResultsWrapper">
                <div ref="notificationOverlay" className="notificationOverlay"></div>
                <div ref="notificationMessage" className="alert alert-info notificationMessage">Thanks for playing.</div>
                <h3>Game Stats</h3>
                <div className="resultsListing displayTable text-center">
                    {underscore.map(this.playerData, (row, key) => {
                        let backgroundColor = '#337ab7', winnerStrength = 0;
                        if (row.rank && row.rank === this.playerData.length) {
                            backgroundColor = '#c9302c';
                        } else if (row.rank && row.rank > 1) {
                            backgroundColor = '#33B786';
                        } else {
                            winnerStrength = 1;
                        }
                        return (
                            <div key={key} style={{width: `${100/this.playerData.length}%`}} className="displayTableCell text-capitalize">
                                {this.getAvatarImage(row.rank)}
                                <span style={{backgroundColor: backgroundColor, paddingTop: `${(row.points.length + winnerStrength) * this.playerStrengthMultiplier / 2}px`}}>
                                    <h4 className="rankLabel">{row.rank ? row.rank : '1'}</h4>
                                    {row.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="gameStatsGraph">
                    <ReactHighcharts config={getLineChartConfig(this.lineChartSeries, 200)} />
                </div>
                <div className="buttonWrapper text-center">
                    <button className="btn btn-danger" onClick={this.resetGame}>Reset Game</button>
                </div>
            </div>
        );
    }
};

export default GameResults;
