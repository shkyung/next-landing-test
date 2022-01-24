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
                                    <div className="section section1">
                                        <h3>Home</h3>
                                    </div>
                                    <div className="section">
                                        <div className="slide">
                                            <h3>features</h3>
                                        </div>
                                        <div className="slide">
                                            <h3>Slide 2.2</h3>
                                        </div>
                                        <div className="slide">
                                            <h3>Slide 2.3</h3>
                                        </div>
                                    </div>
                                    <div className="section">
                                        <h3>gallery</h3>
                                    </div>
                                    <div className="section active">
                                        <h3>news</h3>
                                        <button onClick={() => fullpageApi.moveTo(1, 0)}>
                                            Move top
                                        </button>
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