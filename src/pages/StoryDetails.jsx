import { useRef, useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { removeStory, toggleStoryLike, addStoryComment, removeStoryComment } from "../store/actions/story.actions.js"
import { saveStory } from "../store/actions/user.actions.js"
import { DetailsImg } from "../cmps/DetailsCmps/DetailsImg.jsx"
import { DetailsHeader } from "../cmps/DetailsCmps/DetailsHeader.jsx"
import { DetailsTexts } from "../cmps/DetailsCmps/DetailsTexts.jsx"
import { DetailsFooter } from "../cmps/DetailsCmps/DetailsFooter.jsx"
import { StoryOptionsModal } from "../cmps/StoryOptionsModal.jsx"
import Close from "../assets/svg/close.svg?react"

export function StoryDetails() {
    const navigate = useNavigate()
    const modalContentRef = useRef(null)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const [story, setStory] = useState(null)
    const { storyId } = useParams()
    const [openedStoryOptions, setOpenedStoryOptions] = useState(false)

    useEffect(() => {
        loadStory()
    }, [storyId, story, stories])

    async function loadStory() {
        try {
            let story = stories.find(story => story._id === storyId)
            setStory(story)
        } catch (err) {
            console.log(err)
        }
    }

    function handleClickOutside(ev) {
        if (!openedStoryOptions && modalContentRef.current && !modalContentRef.current.contains(ev.target)) {
            onCloseDetails()
        }
    }

    function onCloseDetails() {
        navigate(-1)
    }

    function onOpenOptions() {
        setOpenedStoryOptions(true)
    }

    function onCloseOptions() {
        setOpenedStoryOptions(false)
    }

    async function toggleLike(story, user) {
        try {
            await toggleStoryLike(story, user)
        } catch (err) {
            console.log(err)
        }
    }

    async function clickUser(userId) {
        const user = await userService.getById(userId)
        navigate(`/${user.username}`)
    }

    async function addComment(story,user, txt) {
        try {
            await addStoryComment(story,user, txt)
        } catch (err) {
            console.log(err)
        }
    }

    async function onRemoveComment(story, commentId) {
        try {
            await removeStoryComment(story, commentId)
        } catch (err) {
            console.log(err)
        }
    }

    async function onRemoveStory() {
        try {
            if (!confirm('Are you sure you want to delete this story?')) return
            navigate(-1)
            await removeStory(story._id)
        } catch (err) {
            console.log(err)
        }
    }

    // TODO
    function openLikedBy(storyId) {
        console.log(`opening likes page for story ${storyId}`)
    }

    //TODO
    function shareStory(storyId) {
        console.log(`sharing story ${storyId}`)
    }

    function onSaveStory(story, user) {
        saveStory(story, user)
    }

    if (!story) return

    return (
        <div className='modal-overlay' onClick={handleClickOutside}>
            {openedStoryOptions &&
                <StoryOptionsModal
                    onCloseOptions={onCloseOptions}
                    onRemoveStory={onRemoveStory}
                />}

            <div className='story-details' ref={modalContentRef}>
                <DetailsImg
                    story={story}
                    toggleLike={toggleLike}
                />
                <section className='details-info'>
                    <DetailsHeader
                        story={story}
                        clickUser={clickUser}
                        onOpenOptions={onOpenOptions}
                    />
                    <DetailsTexts
                        story={story}
                        clickUser={clickUser}
                        onRemoveComment={onRemoveComment}
                    />
                    <DetailsFooter
                        story={story}
                        toggleLike={toggleLike}
                        shareStory={shareStory}
                        onSaveStory={onSaveStory}
                        openLikedBy={openLikedBy}
                        addComment={addComment}
                    />
                </section>
            </div>

            <div className='close-btn'>
                <Close />
            </div>
        </div>
    )
}