
interface AvatarProps {

    avatar: string,
    name: string,
    email: string,

}


const Avatar: React.FC<AvatarProps> = (props) => {
    return (
        <section className='profile-info'>
            <img className='profile-info__image' src={props.avatar} alt="" />
            <h2 className='profile-info__name'></h2>
            <p className='profile-info__email'></p>
        </section>
    )
}

export default Avatar;


