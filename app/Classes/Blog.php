<?php

class Blog
{
    private int $id;
    private int $authorId;
    private string $date;
    private string $title;
    private string $content;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Blog
     */
    public function setId(int $id): Blog
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return int
     */
    public function getAuthorId(): int
    {
        return $this->authorId;
    }

    /**
     * @param int $authorId
     * @return Blog
     */
    public function setAuthorId(int $authorId): Blog
    {
        $this->authorId = $authorId;
        return $this;
    }

    /**
     * @return string
     */
    public function getDate(): string
    {
        return $this->date;
    }

    /**
     * @param string $date
     * @return Blog
     */
    public function setDate(string $date): Blog
    {
        $this->date = $date;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return Blog
     */
    public function setTitle(string $title): Blog
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string
     */
    public function getContent(): string
    {
        return $this->content;
    }

    /**
     * @param string $content
     * @return Blog
     */
    public function setContent(string $content): Blog
    {
        $this->content = $content;
        return $this;
    }


}
