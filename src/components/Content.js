import DataTable from "./Table";

export default function Content(){
    const initialResources = [
        "UX/UI Design", "Frontend", "Backend", "Full Stack", "Graphic Design", "Web Designer", "QA"
    ]

    return(
        <div className="content">
            <DataTable initialResources={initialResources} />
        </div>
    )
}