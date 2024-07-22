import MoreOptions from '../../assets/svg/MoreOptions.svg?react'

export function StoryHeader({ story, clickUser, onOpenOptions }) {

    return (
        <section className="story-header">
            <div className="user-info">
                <div
                    className="profile-link"
                    onClick={() => clickUser(story.by._id)}>
                    <img src={story.by.imgUrl} />
                    <p>{story.by.fullname}</p>
                </div>
            </div>
            <div
                className="more-options"
                onClick={() => onOpenOptions(story._id)}>
                <MoreOptions />
            </div>
        </section>
    )
}