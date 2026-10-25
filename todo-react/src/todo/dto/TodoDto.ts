/*

public record TodoDto(Long id,
                      String title,
                      String description,
                      boolean completed) {
}

 */

export interface TodoDto{
    id:number;
    title:string;
    description:string;
    isCompleted?:boolean
}