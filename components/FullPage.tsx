import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
//import "fullpage.js/vendors/scrolloverflow";

const Fullpage = () => {
    const onLeave = (origin: { index: string; }, destination: any, direction: any) => {
        console.log("Leaving section " + origin.index);
    }
    const afterLoad = (origin: any, destination: { index: string; }, direction: any) => {
        console.log("After load: " + destination.index);
    }
    const anchors = ["home", "features", "gallery", "news"]
    return (
        <ReactFullpage
            //fullpage options
            licenseKey={'YOUR_KEY_HERE'}
            render={({state, fullpageApi}) => {
                return (
                    <ReactFullpage
                        anchors={anchors}
                        navigation
                        navigationTooltips={anchors}
                        scrollOverflow={true}
                        sectionsColor={["orange", "purple", "green", "blue"]}
                        onLeave={(origin, destination, direction) => {
                            console.log("onLeave event", { origin, destination, direction });
                        }}
                        afterLoad={(origin, destination, direction) => {
                            console.log("afterLoad event", { origin, destination, direction });
                        }}
                        render={({state, fullpageApi}) => {
                            return (
                                <div id="fullpage-wrapper">
                                    <div className="section section1 active">
                                        <h3>Home</h3>
                                    </div>
                                    <div className="section">
                                        <div className="slide">
                                            <h3>Feature #1 - Light</h3>
                                        </div>
                                        <div className="slide">
                                            <h3>Feature #1 - Dark</h3>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <div className="slide">
                                            <h3>Feature #2 - Light</h3>
                                        </div>
                                        <div className="slide">
                                            <h3>Feature #2 - Dark</h3>
                                        </div>
                                    </div>
                                    <div className="section">
                                        {/*<h3>news</h3>*/}
                                        {/*<button onClick={() => fullpageApi.moveTo(1, 0)}>*/}
                                        {/*    Move top*/}
                                        {/*</button>*/}
                                        <div className="slide">
                                            <h3>Feature #2 - Light</h3>
                                        </div>
                                        <div className="slide">
                                            <h3>Feature #2 - Dark</h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    />
                );
            }}
        />)
};

export default Fullpage