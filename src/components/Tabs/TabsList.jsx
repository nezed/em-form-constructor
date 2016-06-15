import css from './Tabs.css';

export default class TabsList extends React.Component {
    static contextTypes = {
        onRequestTab: React.PropTypes.func.isRequired,
        activeTab: React.PropTypes.number.isRequired
    }

    static propTypes = {
        activeClass: React.PropTypes.string
    }

    render() {
        const {activeTab, onRequestTab} = this.context,
            {activeClass = css.tabActive} = this.props,
            childs = React.Children.toArray(this.props.children);

        return (
            <div className={ css.tabsList } {...this.props}>
                {
                    childs.map((child, i) => {
                        let {className = css.tab} = child.props;

                        if(i === activeTab) {
                            className = activeClass;
                        }

                        return React.cloneElement(child, {
                            className,
                            onClick: Utils.createChainedFunction(
                                onRequestTab.bind(null, i),
                                child.props.onClick
                            )
                        });
                    })
                }
            </div>
        );
    }
}
