import React, {useState, useEffect} from 'react';
import ReactFullpage, {Item} from '@fullpage/react-fullpage';

const FullPage = () => {
    const style = {
        //  color: "red"
    }

    const afterLoad = (origin: Item, destination: Item, direction: string) => {
        const {index} = destination
        // @ts-ignore
        document.getElementById("fp-nav").style.visibility = index === 0 ? "hidden" : "visible"
        console.error("afterLoad event", {origin, destination, direction});
    }

    const afterSlideLoad = (section: Item, origin: Item, destination: Item, direction: string) => {
        console.error("----afterSlideLoad", {section, origin, destination, direction})
    }

    return (
        <ReactFullpage
            css3={false}
            navigation
            scrollOverflow={true}
            afterLoad={afterLoad}
            afterSlideLoad={afterSlideLoad}
            render={({state, fullpageApi}) => {
                const index = state?.destination?.index

                const getDisplayInfo = (): {sectionIndex: number, isDarkMode: boolean}  | undefined  => {
                    const lastEvent = state.lastEvent
                    const destinationItem = state.destination?.item

                    if (lastEvent === "afterLoad") {
                        const slidesEl = state.destination.item.querySelector(".fp-slides")

                        if (slidesEl) {
                            const activeSlideEl = slidesEl.querySelector(".active")
                            const sectionIndex = Number(activeSlideEl.getAttribute("data-index"))
                            const isDarkMode = activeSlideEl.classList.contains("dark")
                            return {
                                sectionIndex,
                                isDarkMode
                            }
                        }
                    } else if (lastEvent === 'afterSlideLoad') {
                        const sectionIndex = Number(destinationItem.getAttribute("data-index"))
                        const isDarkMode = destinationItem.classList.contains("dark")
                        return {
                            sectionIndex,
                            isDarkMode
                        }
                    }
                }

                const displayInfo = getDisplayInfo()

                if(typeof window !== "undefined") {
                    const customEvent = new window.CustomEvent('customEvent', {
                        detail: displayInfo
                    })
                    window.dispatchEvent(customEvent)
                }

                return (
                    <div id="fullpage-wrapper">
                        <div className="section" id="section1">
                            <video id="myVideo" loop muted data-autoplay>
                                <source src="flowers.mp4" type="video/mp4"/>
                            </video>
                            <div className="layer">
                                <h1>Test</h1>
                            </div>
                        </div>
                        <div className="section active" id="section2">
                            <div className="slide light" data-index={1}>
                                {/*<div className="overlay-slide">*/}
                                <h2>111 - front</h2>
                                <h2 style={style}>menu1 - test gltf load and animation version4 </h2>
                                <button onClick={() => fullpageApi.moveSlideRight()}>go to back side
                                </button>
                            </div>
                            <div className="slide dark" data-index={1}>
                                <h2>111 - back</h2>
                                <button onClick={() => fullpageApi.moveSlideLeft()}>go to front side
                                </button>
                            </div>
                        </div>
                        <div className="section" id="section3">
                            <div className="slide light" data-index={2}>
                                <div className="overlay-slide">
                                    <h2>222 - front</h2>
                                    <button onClick={() => fullpageApi.moveSlideRight()}>go to back side
                                    </button>
                                    <h2 style={style}>menu2 - test gltf load and animation version5 </h2>
                                </div>
                                {/*<div> {sectionIndex ===2 && !isDarkMode ? <Character5/> : null}</div>*/}
                            </div>
                            <div className="slide dark" data-index={2}>
                                <h2>222 - back</h2>
                                <button onClick={() => fullpageApi.moveSlideLeft()}>go to front side
                                </button>
                            </div>
                        </div>
                        <div className="section" id="section4">
                            <div className="slide light" data-index={3}>
                                <div className="overlay-slide">
                                    <h2>333- front</h2>
                                    <button onClick={() => fullpageApi.moveSlideRight()}>go to back side
                                    </button>
                                </div>
                            </div>
                            <div className="slide dark" data-index={3}>
                                <h2>333- back</h2>
                                <button onClick={() => fullpageApi.moveSlideLeft()}>go to front side
                                </button>
                            </div>
                        </div>
                        <div className="section" id="section5">
                            <div className="slide light" data-index={4}>
                                <div className="overlay-slide">
                                    <h2>444 - front</h2>
                                    <button onClick={() => fullpageApi.moveSlideRight()}>go to back side
                                    </button>
                                    <h2 style={style}>test 파티클이미지 </h2>
                                </div>
                            </div>
                            <div className="slide dark" data-index={4}>
                                <h2>444 - back</h2>
                                <button onClick={() => fullpageApi.moveSlideLeft()}>go to front side
                                </button>
                            </div>
                        </div>
                        <div className="section" id="section6">
                            <h2>Single Page 2</h2>
                        </div>
                        <div className="section" id="section7">
                            <h2>Single Page 3</h2>
                        </div>
                        <div className="section" id="section8">
                            <h2>Single Page 4</h2>
                        </div>
                    </div>
                );
            }}
        />
    )
}

export default FullPage