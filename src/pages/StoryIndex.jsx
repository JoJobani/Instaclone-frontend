import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
    loadStories,
    loadStory,
    removeStory,
    toggleStoryLike,
    addStoryComment
} from "../store/actions/story.actions.js"
import { Outlet } from "react-router"
import { StoryList } from "../cmps/StoryList.jsx"
import { StoryOptionsModal } from "../cmps/StoryOptionsModal.jsx"

export function StoryIndex() {
    const navigate = useNavigate()
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const story = useSelector(storeState => storeState.storyModule.story)
    const [openedStoryOptions, setOpenedStoryOptions] = useState(false)

    useEffect(() => {
        awaitLoad()
    }, [stories])

    async function awaitLoad() {
        try {
            await loadStories()
        } catch (err) {
            console.log(err)
        }
    }

    function clickUser(userId) {
        console.log(`clicked user ${userId}`)
    }

    async function openDetails(storyId) {
        navigate(`/p/${storyId}`)
    }

    async function onOpenOptions(storyId) {
        await loadStory(storyId)
        setOpenedStoryOptions(true)
    }

    function onCloseOptions() {
        setOpenedStoryOptions(false)
        loadStory(null)
    }

    async function onRemoveStory() {
        try {
            if (!confirm('Are you sure you want to delete this story?')) return
            await removeStory(story._id)
            onCloseOptions()
        } catch (err) {
            console.log(err)
        }
    }

    async function toggleLike(storyId) {
        try {
            await toggleStoryLike(storyId)
        } catch (err) {
            console.log(err)
        }
    }

    async function addComment(storyId, txt) {
        try {
            await addStoryComment(storyId, txt)
        } catch (err) {
            console.log(err)
        }
    }

    function shareStory(storyId) {
        console.log(`sharing story ${storyId}`)
    }

    function saveStory(storyId) {
        console.log(`saving story ${storyId}`)
    }

    function openLikedBy(storyId) {
        console.log(`opening likes page for story ${storyId}`)
    }

    return (
        <main className="story-index">
            <Outlet />
            {openedStoryOptions &&
                <StoryOptionsModal
                    onCloseOptions={onCloseOptions}
                    onRemoveStory={onRemoveStory} />}
            {!stories || !stories.length
                ? <div>Loading...</div>
                : <StoryList
                    stories={stories}
                    clickUser={clickUser}
                    onOpenOptions={onOpenOptions}
                    toggleLike={toggleLike}
                    addComment={addComment}
                    openDetails={openDetails}
                    shareStory={shareStory}
                    saveStory={saveStory}
                    openLikedBy={openLikedBy}
                />
            }
        </main>
    )
}