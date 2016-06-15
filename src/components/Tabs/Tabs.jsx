import css from './Tabs.css';

export default class Tabs extends React.Component {
    static childContextTypes = {
        onRequestTab: React.PropTypes.func.isRequired,
        activeTab: React.PropTypes.number.isRequired
    }

    static propTypes = {
        activeTab: React.PropTypes.number
    }

    constructor({activeTab = 0}) {
        super(...arguments);

        this.state = {
            activeTab
        };
    }

    componentWillReceiveProps({activeTab}) {
        if(activeTab !== undefined) {
            this.setState({
                activeTab
            });
        }
    }

    getChildContext() {
        return {
            onRequestTab: this.onRequestTab,
            activeTab: this.state.activeTab
        };
    }

    onRequestTab = (activeTab) => {
        this.setState({
            activeTab
        });
    }

    render() {
        return (
            <div className={ css.module } {...this.props}>
                {
                    this.props.children
                }
            </div>
        );
    }
}
