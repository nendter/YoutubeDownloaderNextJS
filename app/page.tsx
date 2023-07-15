import {Item} from "@/app/(item)/Item";
import {AddInput} from "@/app/(components)/AddInput";
import {VideoInformation} from "@/app/api/route";
import {Providers} from "@/app/(components)/Providers";
import {Items} from "@/app/(components)/Items";
import {DownloadButton} from "@/app/(components)/(download_button)/DownloadButton";

export default function Home() {
    return (
        <div className="content_container">
            <div className="main">
                <h1>Youtube Downloader</h1>
                <p>Für einzelne Videos oder Playlisten</p>
            </div>
            <AddInput></AddInput>
            <div className="divider"></div>
            <Items></Items>
            <DownloadButton></DownloadButton>
        </div>
    )
}
