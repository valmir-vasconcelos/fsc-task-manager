import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = (taskId) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateTask", taskId],
        mutationFn: async (updateData) => {
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    title: updateData.title.trim(),
                    description: updateData.description.trim(),
                    time: updateData.time.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error();
            }

            const updatedTask = await response.json();

            // atualiza o Cache
            queryClient.setQueryData("tasks", (oldTasks) => {
                return oldTasks.map((oldTask) => {
                    if (oldTask.id === taskId) {
                        return updatedTask;
                    }
                    return oldTask;
                });
            });
        },
    });
}