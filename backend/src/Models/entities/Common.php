<?php

namespace App\Models\Entities;

class Common
{
    private int $id;
    private \DateTime $created_at;
    private \DateTime $updated_at;
    private bool $del_flag;

    public function __construct()
    {
        $this->created_at = new \DateTime();
        $this->updated_at = new \DateTime();
        $this->del_flag = false;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getCreateDate(): \DateTime
    {
        return $this->created_at;
    }

    public function setCreateDate(\DateTime $created_at): self
    {
        $this->created_at = $created_at;
        return $this;
    }

    public function getUpdateDate(): \DateTime
    {
        return $this->updated_at;
    }

    public function setUpdateDate(\DateTime $updated_at): self
    {
        $this->updated_at = $updated_at;
        return $this;
    }

    public function getDelFlag(): bool
    {
        return $this->del_flag;
    }

    public function setDelFlag(bool $del_flag): self
    {
        $this->del_flag = $del_flag;
        return $this;
    }
}