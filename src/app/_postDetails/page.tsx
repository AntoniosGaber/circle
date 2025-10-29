
 
 "use client";
// @ts-nocheck




import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card, CardHeader, CardContent, CardActions, Collapse,
  Avatar, IconButton, Typography, TextField, Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import Image from "next/image";
import Link from "next/link";
import type { Post, Comment as PostComment } from "@/interfaces";

interface ExpandMoreProps { expand: boolean; }

const ExpandMore = styled(
  ({ expand, ...other }: React.ComponentProps<typeof IconButton> & ExpandMoreProps) => (
    <IconButton {...other} />
  )
)(({ expand }) => ({
  marginLeft: "auto",
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  transition: "transform 150ms",
}));

export default function PostDetails({
  post,
  isComments,
}: {
  post: Post;
  isComments?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  
  const [comments, setcomments] = React.useState<PostComment[]>(post?.comments || []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const values = {
      content: (form as any).comment.value,
      post: (post as any)._id || (post as any).id,
    };
    const response = await fetch(`https://linked-posts.routemisr.com/comments`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        token: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    
    setcomments(data.comments || comments);
  }

  return (
    <>
      <Card
        sx={{ maxWidth: 450, margin: "auto", padding: "2rem", marginTop: "3rem", gap: "1rem" }}
        elevation={5}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500], width: 40, height: 40 }} aria-label="recipe">
              {post?.user?.photo ? (
                <Image
                  src={post.user.photo}
                  alt={post?.user?.name || "user"}
                  width={40}
                  height={40}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                (post?.user?.name || "U").slice(0, 1)
              )}
            </Avatar>
          }
          action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
          title={post?.user?.name}
          subheader={post?.createdAt?.split("T")?.[0]}
        />

        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {post?.body}
          </Typography>
        </CardContent>

        {post?.image && (
          <Image
            src={post.image}
            alt={post.body || "post image"}
            width={400}
            height={400}
            style={{ width: "100%", objectFit: "cover" }}
          />
        )}

        <CardActions
          sx={{ width: "70%", mx: "auto", display: "flex", justifyContent: "space-between" }}
        >
          <IconButton aria-label="add to favorites"><ThumbUpIcon /></IconButton>
          <ExpandMore
            expand={expanded}
            onClick={() => setExpanded((p) => !p)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
          <IconButton aria-label="share"><ShareIcon /></IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          
          {comments?.length > 0 && !isComments ? (
            <CardContent sx={{ backgroundColor: "#eee", my: 2 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500], width: 40, height: 40 }} aria-label="recipe">
                    {comments[0].commentCreator.photo &&
                    !comments[0].commentCreator.photo.includes("undefined") ? (
                      <Image
                        src={comments[0].commentCreator.photo}
                        alt={comments[0].commentCreator.name}
                        width={40}
                        height={40}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      comments[0].commentCreator.name.slice(0, 1)
                    )}
                  </Avatar>
                }
                action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                title={comments[0].commentCreator.name}
                subheader={comments[0].createdAt.split("T")[0]}
              />
              <Typography sx={{ mb: 2, width: "80%", mx: "auto" }}>
                {comments[0].content}
              </Typography>
              <Link
                href={`/singlePost/${(post as any)._id}`}
                style={{ textAlign: "right", width: "100%", display: "block", color: "#09c", textDecoration: "none", fontWeight: 500, marginTop: "4px" }}
              >
                view all comments
              </Link>
            </CardContent>
          ) : (
            
            isComments &&
            comments.map((comment: PostComment) => (
              <CardContent key={comment._id} sx={{ backgroundColor: "#eee", my: 2 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500], width: 40, height: 40 }} aria-label="recipe">
                      {comment.commentCreator.photo &&
                      !comment.commentCreator.photo.includes("undefined") ? (
                        <Image
                          src={comment.commentCreator.photo}
                          alt={comment.commentCreator.name}
                          width={40}
                          height={40}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        comment.commentCreator.name.slice(0, 1)
                      )}
                    </Avatar>
                  }
                  action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                  title={comment.commentCreator.name}
                  subheader={comment.createdAt.split("T")[0]}
                />
                <Typography sx={{ mb: 2, width: "80%", mx: "auto" }}>
                  {comment.content}
                </Typography>
              </CardContent>
            ))
          )}

          <form
            onSubmit={(e) => handleSubmit(e)}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0.75rem", borderTop: "1px solid #eee" }}
          >
            <TextField
              id="comment" name="comment" placeholder="comment" type="text"
              variant="outlined" size="small" fullWidth inputProps={{ "aria-label": "comment" }}
              sx={{
                flexGrow: 1,
                "& .MuiOutlinedInput-root": { borderRadius: "10px", backgroundColor: "#fafafa" },
                "& fieldset": { borderColor: "#e0e0e0" },
                "&:hover fieldset": { borderColor: "#cfcfcf" },
                "&.Mui-focused fieldset": { borderColor: "primary.main" },
              }}
            />
            <Button type="submit" variant="contained" disableElevation
              sx={{ minWidth: 72, px: 2.5, height: 40, borderRadius: "10px", fontWeight: 700, letterSpacing: 0.4 }}>
              ADD
            </Button>
          </form>
        </Collapse>
      </Card>
    </>
  );
}
