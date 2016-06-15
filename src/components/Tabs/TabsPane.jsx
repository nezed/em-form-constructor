import css from './Tabs.css';

export default class TabsPane extends React.Component {
    static contextTypes = {
        activeTab: React.PropTypes.number.isRequired
    }

    static propTypes = {
        activeClass: React.PropTypes.string
    }

    render() {
        const {activeTab} = this.context,
            {activeClass = css.tabContentActive} = this.props,
            childs = React.Children.toArray(this.props.children);

        return (
            <div className={ css.tabPane } {...this.props}>
                {
                    childs.map((child, i) => {
                        let {className = css.tabContent} = child.props;

                        if(i === activeTab) {
                            className = activeClass;
                        }

                        return React.cloneElement(child, {
                            className
                        });
                    })
                }
            </div>
        );
    }
}
