import { memo } from 'react'
import { Motion, spring } from 'react-motion';
import './ContextMenu.scss';

const ContextMenu = ({ children, showMenu, yPos, xPos }: any) => {
    return (
        <Motion
            defaultStyle={{ opacity: 0 }}
            style={{ opacity: !showMenu ? spring(0) : spring(1) }}
        >
            {(interpolatedStyle) => (
                <>
                    {showMenu ? (
                        <div
                            className="menu-container"
                            style={{
                                top: yPos,
                                left: xPos,
                                opacity: interpolatedStyle.opacity,
                            }}
                        >
                            {children}
                        </div>
                    ) : (
                            <></>
                        )}
                </>
            )}
        </Motion>
    )
}

export default memo(ContextMenu);
