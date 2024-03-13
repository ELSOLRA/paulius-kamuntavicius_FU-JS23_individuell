
interface AvatarProps {

    avatar: string,
    size: 'big' | 'small'
    name: string,
    addlInfo: string,
    textmode: 'first' | 'second'


}


const Avatar: React.FC<AvatarProps> = ({avatar, size, name, addlInfo }) => {
    return (
        <section className={`profile-info ${size}`}>
            <img className='profile-info__image' src={avatar} alt={`Profile picture of ${name}`} />
            <h2 className='profile-info__name'>{name}</h2>
            <p className='profile-info__desc'>{addlInfo}</p>
        </section>
    )
}

export default Avatar;


