import { useState, useRef, useEffect } from 'react'

export function StoryOptionsModal({ onCloseMore, onRemoveStory }) {
    const modalContentRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (modalContentRef.current && !modalContentRef.current.contains(ev.target)) {
                onCloseMore()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="modal-overlay">
            <ul className='modal-options' ref={modalContentRef}>
                <li onClick={onRemoveStory}>
                    Remove
                </li>
                <li>
                    Edit
                </li>
                <li onClick={onCloseMore}>
                    Cancel
                </li>
            </ul>
        </div>
    )
}