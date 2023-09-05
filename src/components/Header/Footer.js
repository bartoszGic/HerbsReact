import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {

    return (
        <footer className='fixed flex justify-center bg-teal-500 text-white w-full bottom-0 z-20'>
            <a className="flex justify-center items-center" href="https://github.com/bartoszGic" target="_blank" rel="noopener noreferrer">
                <p className="p-1 mr-1 lg:py-4">See my Github</p>
                <FontAwesomeIcon size="lg" icon={faGithub} />
            </a>
        </footer>
    );
}
export default Footer