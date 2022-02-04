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
                        //anchors={anchors}
                        navigation
                        //navigationTooltips={anchors}
                        scrollOverflow={true}
                        sectionsColor={["orange", "purple", "green", "blue", "red", "grey"]}
                        onLeave={(origin, destination, direction) => {
                            console.error("onLeave event", { origin, destination, direction });
                        }}
                        afterLoad={(origin, destination, direction) => {
                            console.error("afterLoad event", { origin, destination, direction });
                        }}
                        render={({state, fullpageApi}) => {
                            return (
                                <div id="fullpage-wrapper">
                                    <div className="section section1 active">
                                        <h3>Home</h3>
                                    </div>
                                    <div className="section section2">
                                        <div className="slide">
                                            <h3>Feature #1 - Light</h3>
                                            <button>go to dark side</button>
                                        </div>
                                        <div className="slide">
                                            <h3>Feature #1 - Dark</h3>
                                            <button>go to light side</button>
                                        </div>
                                    </div>
                                    <div className="section section3">
                                        <div className="slide">
                                            <h3>Feature #2 - Light</h3>
                                            <button>go to dark side</button>
                                        </div>
                                        <div className="slide">
                                            <h3>Feature #2 - Dark</h3>
                                            <button>go to light side</button>
                                        </div>
                                    </div>
                                    <div className="section section4">
                                        <div className="slide">
                                            <h3>Feature #3 - Light</h3>
                                            <button>go to dark side</button>
                                        </div>
                                        <div className="slide">
                                            <h3>Feature #3 - Dark</h3>
                                            <button>go to light side</button>
                                        </div>
                                    </div>
                                    <div className="section section5">
                                        <h3>Gallery</h3>
                                    </div>
                                    <div className="section section6">
                                        <h3>News</h3>
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