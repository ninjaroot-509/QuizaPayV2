import React from 'react'

export const ResultsTable = ({ results }) => {

    if (results === undefined) return <p>loading...</p>
    else {
        return (
            <>
                <h5 className=" mt-5">Top 10 des résultats!</h5>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-primary"><th>Joueur</th>
                        {/* <th>Quiz</th> */}
                        <th>But</th></tr>
                    </thead>
                    <tbody>
                        {results.slice(0, 10).map((item) =>
                            <tr key={item.id} >
                                <td>{item.player}</td>
                                {/* <td>{item.quizz_id.name}</td> */}
                                <td>{item.score}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        )
    }
}
